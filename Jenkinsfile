pipeline {
    agent {
        kubernetes {
            defaultContainer 'node' // Default container name
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18
    command:
    - cat
    tty: true
  - name: docker
    image: gcr.io/cloud-builders/docker
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: /var/log/docker.sock
      name: docker-sock
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/log/docker.sock


                '''
        }
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                container('node') {
                    sh '''
                        # Navigate to your Node.js app directory
                        cd history-service

                        # Install dependencies
                        npm install

                        # Build your Node.js application
                        npm run build
                    '''
                }
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'docker:24.0.6-dind'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                }
            }
            steps {
                sh 'docker info'
            }
        }

        stage ('Build Docker Image') {
            steps {
                dir('history-service') {
                    dockerImage = docker.build("yuehern/history-service:latest")
                }
            }
        }
    }
}



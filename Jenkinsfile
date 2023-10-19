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
    image: docker:latest
    command:
    - cat
    tty: true
  volumeMounts:
  - mountPath: /var/run/docker.sock
    name: docker-sock
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock

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

        stage ('Build docker image') {
            steps {
                container('docker') {
                    sh 'docker build -t yuehern/history-service:latest .'
                }
            }
        }
    }
}

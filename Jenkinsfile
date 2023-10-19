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
    image: docker:24.0.6-dind
    command:
    - cat
    tty: true
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

        stage ('Build Docker Image') {
            steps {
                container('docker'){
                    sh '''
                        # Navigate to your Node.js app directory
                        cd history-service

                        # Build the Docker image
                        docker build -t history-service .
                    '''
                }
            }
        }
    }
}

//sample push
pipeline {
        environment{
            customImage = ""
        }

        agent any 
        tools {nodejs "nodejs"}

//     agent {
//         kubernetes {
//             defaultContainer 'node' // Default container name
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:
//     - name: node
//       image: node:18
//       command:
//         - cat
//       tty: true
//                 '''
//         }
//     }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
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

        stage('Build Docker Image') {
            steps {
                // Inside the 'node' container
                dir('history-service') {
                    // Change the working directory to 'history-service'

                    script {
                        // Execute your Docker build command here
                        customImage = docker.build("history-service:${env.BUILD_ID}")
                    }
                }
                dir('questions-service') {
                    // Change the working directory to 'history-service'

                    script {
                        // Execute your Docker build command here
                        customImage = docker.build("questions-service:${env.BUILD_ID}")
                    }
                }
            }
        }

                stage('Authenticate with Google Cloud') {
                    steps {
                        script {
                            sh "gcloud auth configure-docker asia-southeast1-docker.pkg.dev"
                            // sh "docker tag history-service:${env.BUILD_ID} asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:${env.BUILD_ID}"
                            sh "docker tag history-service:${env.BUILD_ID} yuehern/history-service:${env.BUILD_ID}"
                            // sh "docker push asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:${env.BUILD_ID}"
                            sh "docker push yuehern/history-service:${env.BUILD_ID}"
                        }
            }
        }
        }

    }



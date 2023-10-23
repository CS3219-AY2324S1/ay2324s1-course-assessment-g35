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
            }
        }

                stage('Authenticate with Google Cloud') {
                    steps {
                        script {
                            sh "gcloud auth configure-docker asia.gcr.io"
                            sh 'docker tag history-service:latest https://asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:latest'
                            sh 'docker push https://asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:latest'

                        }
            }
        }
        // stage("docker push") {
        //     steps {
        //         script {
        //             docker.withRegistry('https://gcr.io', "gcr:credential-id") {
        //             customImage.push("imageTag")
        //         }
        //     }
        // }
        }

    }



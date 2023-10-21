pipeline {
        agent any
        environment{
            customImage = ""
        }
//     agent {
//         kubernetes {
//             defaultContainer 'node' // Default container name
//             yaml '''
// apiVersion: v1
// kind: Pod
// spec:
//   containers:
//   - name: node
//     image: node:18
//     command:
//     - cat
//     tty: true
//                 '''
//         }
//     }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        // stage('Build') {
        //     steps {
        //         container('node') {
        //             sh '''
        //                 # Navigate to your Node.js app directory
        //                 cd history-service

        //                 # Install dependencies
        //                 npm install

        //                 # Build your Node.js application
        //                 npm run build
        //             '''
        //         }
        //     }
        // }

        stage('Build Docker Image') {
            environment {
                GCR_CRED = credentials('My First Project')
                GCR_REPO = "gcr.io/${blahblah}"
            }

            steps {
                dir('history-service') {
                    // Change the working directory to 'history-service'
                    
                    script {
                        // Execute your Docker build command here
                        customImage = docker.build("history-service:${env.BUILD_ID}")
                    }
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



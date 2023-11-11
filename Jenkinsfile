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

        stage('Build Frontend') {
            steps {
                withCredentials([
                    string(credentialsId: 'firebaseConfig', variable: 'apiKey'),
                    string(credentialsId: 'authDomain', variable: 'authDomain'),
                    string(credentialsId: 'databaseURL', variable: 'databaseURL'),
                    string(credentialsId: 'projectId', variable: 'projectId'),
                    string(credentialsId: 'storageBucket', variable: 'storageBucket'),
                    string(credentialsId: 'messagingSenderId', variable: 'messagingSenderId'),
                    string(credentialsId: 'appId', variable: 'appId')
                ]) {
                    sh '''
                        # Navigate to your Node.js app directory
                        cd frontend
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
                        source ~/.bashrc
                        nvm install 18
                        nvm use 18
                        # Install dependencies
                        npm install
`
                        # Build your Node.js application
                        npm run build
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Inside the 'node' container
                dir('frontend') {
                    // Change the working directory to 'history-service'

                    script {
                        // Execute your Docker build command here
                        customImage = docker.build("astral-shape-402017/frontend:${env.BUILD_ID}")
                    }
                }
                // dir('questions-service') {
                //     // Change the working directory to 'history-service'

                //     script {
                //         // Execute your Docker build command here
                //         customImage = docker.build("questions-service:${env.BUILD_ID}")
                //     }
                // }
            }
        }
        stage('Build History Service') {
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

            //     stage("Pushing Application Docker Image to Google Artifact Registry"){
            // steps{
            //     script{
            //         sh'''
            //             gcloud auth configure-docker asia-southeast1-docker.pkg.dev
            //             docker push asia-southeast1-docker.pkg.dev/astral-shape-402017/history-service:${env.BUILD_ID}
            //             '''
            //           }
            //      }
            // }


        //         stage('Authenticate with Google Cloud') {
        //             steps {
        //                 script {
        //                     sh "gcloud auth configure-docker asia-southeast1-docker.pkg.dev"
        //                     // sh "docker tag history-service:${env.BUILD_ID} asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:${env.BUILD_ID}"
        //                     sh "docker tag history-service:${env.BUILD_ID} yuehern/history-service:${env.BUILD_ID}"
        //                     // sh "docker push asia-southeast1-docker.pkg.dev/astral-shape-402017/cs3219/history-service:${env.BUILD_ID}"
        //                     // sh "docker push yuehern/history-service:${env.BUILD_ID}"
        //                 }
        //     }
        // }
        }

    }
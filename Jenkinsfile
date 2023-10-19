pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Change the working directory to your desired path
                dir('/history-service') {
                    sh 'ls'
                    // Inside this block, you're in the specified directory
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npx prisma generate'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('/history-service') {

                script {
                    // Define the Docker image name and tag
                    def dockerImageName = 'history-service'
                    def dockerImageTag = 'latest'

                    // Build the Docker image
                    docker.build("${dockerImageName}:${dockerImageTag}", "-f Dockerfile .")
                    // Optionally, you can push the image to a Docker registry
                    // docker.withRegistry('https://your-docker-registry-url', 'your-registry-credentials') {
                    //     docker.image("${dockerImageName}:${dockerImageTag}").push()
                    // }
                }
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

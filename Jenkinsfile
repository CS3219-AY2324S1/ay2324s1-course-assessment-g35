pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
                stage('Build Docker Image') {
            steps {
                script {
                    // Define the Docker image name and tag
                    def dockerImageName = 'your-image-name'
                    def dockerImageTag = 'your-image-tag'

                    // Build the Docker image
                    docker.build("${dockerImageName}:${dockerImageTag}", "-f Dockerfile .")
                    // Optionally, you can push the image to a Docker registry
                    // docker.withRegistry('https://your-docker-registry-url', 'your-registry-credentials') {
                    //     docker.image("${dockerImageName}:${dockerImageTag}").push()
                    // }
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

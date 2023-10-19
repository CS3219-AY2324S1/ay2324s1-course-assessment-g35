pipeline {
    agent {
        kubernetes {
            label 'my-custom-label'  // Specify a custom label for your Kubernetes agents
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
                        cd /history-service

                        # Install dependencies
                        npm install

                        # Build your Node.js application
                        npm run build
                    '''
                }
            }
        }

        stage('Publish Artifacts') {
            steps {
                archiveArtifacts artifacts: 'path/to/your/app/build/*', allowEmptyArchive: true
            }
        }
    }
}

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
  agent {
    kubernetes {
      label 'jenkinsrun'
      defaultContainer 'builder'
      yaml """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: builder
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      configMap:
        name: docker-config
"""
    }
  }
steps {
      script {
        sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=AWSACCOUNT.dkr.ecr.eu-west-1.amazonaws.com/app:${env.BUILD_ID}"
    } //container
  } //steps

        }
    }
}

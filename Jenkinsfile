pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'cyberangle002'
        IMAGE_NAME = 'tic-tac-devops'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Cloning the repository from GitHub...'
                git branch: 'main', url: 'https://github.com/Cyberangle002/tic-tac-devops.git'
            }
        }

        stage('Build Image') {
            steps {
                echo '🏗️ Building Docker image...'
                bat "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Tag & Push') {
            steps {
                echo '📤 Tagging and pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:latest ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                        docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy (local)') {
            when { expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') } }
            steps {
                echo '🚀 Deploying container locally...'
                bat "docker run -d -p 8080:80 ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed. Check the logs for details.'
        }
    }
}


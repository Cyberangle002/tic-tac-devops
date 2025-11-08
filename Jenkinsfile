pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_NAME = "cyberangle002/tic-tac-devops"
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
                echo '🐳 Building Docker image...'
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Tag & Push') {
            steps {
                echo '📤 Tagging and pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag $IMAGE_NAME:latest $IMAGE_NAME:latest
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy (local)') {
            steps {
                echo '🚀 Deploying container locally...'
                sh '''
                    docker stop tic-tac-devops || true
                    docker rm tic-tac-devops || true
                    docker run -d --name tic-tac-devops -p 8080:80 $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build and Deployment successful!'
        }
        failure {
            echo '❌ Build failed. Check the logs for details.'
        }
    }
}

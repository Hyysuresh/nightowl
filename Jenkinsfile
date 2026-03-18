pipeline {
    agent any
    
    environment{
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage("clean and checkout") {
            steps{
                cleanWs() // Deletes the workspace content
                echo 'Workspace cleaned and code checked out.'
            }
        }
        stage(" clone code ") {
            steps {
                git url: "https://github.com/Hyysuresh/nightowl.git", branch: "main"
            }
        }
        stage("create env file"){
            steps {
                script {
                    echo "creating .env file......"
                    withCredentials([
                        string(credentialsId: 'ARCJET_KEY', variable: 'ARCJET_KEY'),
                        string(credentialsId: 'CLERK_SECRET_KEY', variable: 'CLERK_SECRET'),
                        string(credentialsId: 'DATABASE_URL', variable: 'DATABASE_URL'),
                        string(credentialsId: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', variable: 'NEXT_PUBLIC')
                        ]){
                        sh '''
                        cat <<EOF > .env
                        DATABASE_URL=$DATABASE_URL
                        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC
                        CLERK_SECRET_KEY=$CLERK_SECRET
                        ARCJET_KEY=$ARCJET_KEY
                        EOF
                        '''
                    }
                }
            }
        }
        stage("Build") {
            steps {
                sh "docker build -t hyysuresh/nightowl-${DOCKER_IMAGE_TAG} ."
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Scanning Docker image for vulnerabilities with Trivy...'
            }
        }
        stage("push DockerHub") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DockerHubCreds',
                    usernameVariable: 'dockerHubUser',
                    passwordVariable: 'dockerHubPass')
                ]){
                    sh "docker login -u ${env.dockerHubUser}'\n' -p ${env.dockerHubPass}"
                    sh "docker push hyysuresh/nightowl-${DOCKER_IMAGE_TAG}"
                }
            }
        }
        stage("docker compose ") {
            steps {
                sh "docker compose up -d --build"
            }
        }
    }
    post {
        failure { // This block runs only if the build fails
            emailext (
                subject: 'Nightowl CI CD is Failed : ${env.BUILD_NUMBER}', 
                body: 'O NO Your nightowl application pipeline failed please check', 
                to: 'hyyghasalsaab@gmail.com'
                
            )
        }
        success { // This block runs only if the build succeeds
             emailext (
                subject: "Jenkins Build Success: ${env.BUILD_NUMBER}",
                body: "The build passed successfully. ",
                to: 'hyyghasalsaab@gmail.com'
            )
        }
    }
}

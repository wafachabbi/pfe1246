pipeline {
    agent any
    
    tools{
        nodejs 'nodejs21'  
    } 
/*   
    environment{
        SCANNER_HOME= tool 'sonar-scanner'
    }*/
    stages {
        stage('git-checkout') {
            steps {
                git branch: 'main', credentialsId: 'Wafacg', url: 'https://github.com/Wafacg/pfe1246.git'
            }
        }
        stage('Install Dependecies') {
            steps {
                dir('Backend'){
                  sh 'npm install'
                }
                dir('Frontend'){
                  sh 'npm install'
                }
                dir('Admin'){
                  sh 'npm install'
                  sh'npm install react-router-dom'
                }
            }
        }

        stage('Sonar Analysis') {
            steps {
                sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.url=http://192.168.45.123:9000/ -Dsonar.login=squ_06abf45f6d75107c9ee2337a6a2354db38eeca88 -Dsonar.projectName=pfe_project \
                   -Dsonar.sources=. \
                   -Dsonar.projectKey=pfe_project '''
            }
        }
        stage('Docker Build & Push ') {
            steps {
                   script {
                        sh "docker-compose build " 
                        withDockerRegistry(credentialsId:'wafachabbi' , toolName: 'docker') {
                            sh "docker push wafachabbi/backend:latest"
                            sh "docker push wafachabbi/frontend:latest"
                            sh "docker push wafachabbi/admin:latest"
                        }
                   } 
            }
        }
        stage('Deploy') {
            steps {
                script { // Run Docker image
                    sh "docker-compose up -d" 
                }
            }
        }
    }
}

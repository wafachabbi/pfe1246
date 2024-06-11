pipeline {
    agent any
    
    tools{
        nodejs 'nodejs21'  
    } 
    environment{
        SCANNER_HOME= tool 'sonar-scanner'
    }
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
                sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.url=http://192.168.35.123:9000/ -Dsonar.login=squ_fc0edb84b65cfd8e92b455a52562736111a4fce4 -Dsonar.projectName=pfe_project \
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
        stage('trivy') {
            steps {
                script { // test Docker image
                    sh "trivy image wafachabbi/backend:latest" 
                    sh "trivy image wafachabbi/frontend:latest" 
                    sh "trivy image wafachabbi/admin:latest" 
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

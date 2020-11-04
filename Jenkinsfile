def builderDocker
def CommitHash

pipeline {
    agent any 

    parameters {
        booleanParam(name: 'RunTest', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'pick CI / CI and CD')
        
    }
    stages {

        stage('Build image') {
            when {
                expression {
                    BRANCH_NAME == "development"
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible/frontend; ansible-playbook -i hosts builderdev.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('Build Image') {
            when {
                expression {
                    BRANCH_NAME == "production"
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible/frontend; ansible-playbook -i hosts builderprod.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('deployment to development') {
            when {
                expression {
                    BRANCH_NAME == "development" && CICD == 'CICD'
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible/frontend; ansible-playbook -i hosts deployDev.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

               stage('Run Testing Development') {
            when {
                expression {
                    BRANCH_NAME == "development" && CICD == 'CICD'
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'ansible devserver -a "curl localhost:8080"',
                                        execTimeout: 60000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('deployment to production') {
            when {
                expression {
                    BRANCH_NAME == "production" && CICD == 'CICD'
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd ansible/frontend; ansible-playbook -i hosts deployProd.yml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('Run Testing production') {
            when {
                expression {
                    BRANCH_NAME == "production"  && CICD == 'CICD'
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ansible',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'ansible prod-server -a "curl localhost:8080"',
                                        execTimeout: 60000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        } 
    }
}
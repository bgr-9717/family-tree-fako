
import { Construct } from 'constructs';
import { UserPool, UserPoolClient, AccountRecovery} from 'aws-cdk-lib/aws-cognito';

export class AuthCognito extends Construct {
    public readonly userPool: UserPool;
    public readonly userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string) {
        super(scope,id);

        //creating the User Pool
        this.userPool = new UserPool(this, 'FamilyTreeUserPool',{
            userPoolName: 'FamilyTreeUserPool',
            selfSignUpEnabled: true, //to allow users to signup
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            signInAliases:{email: true}, //to allow signin with an email
            autoVerify: {email: true},


        });

        //App client for frontent
        this.userPoolClient = new UserPoolClient(this, 'FamilyTreeAppClient',{
           userPool:this.userPool,
           generateSecret: false, 
        });
    
    }
}
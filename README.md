# LambdaWebSite
  
awsのapi gatewayとLambda関数のみでWebシステムを構築する。  
Lambda内にサーバサイド処理とフロントエンドのコンテンツ(html,css,js)を両方保持し、  
リクエストURLに応じたハンドリング及びコンテンツの返却を行う。  
  
## ローカル起動方法
```
$ cd sam-app
$ sudo sam local start-api
```
  
## デプロイ方法
以下コマンドを実行し、cloudformationのテンプレート作成及びテンプレートを元にした各種AWSサービスの資材動的生成を行う。  
関数アップロード先のバケットは予め作っておく。stacknameには任意の名前を指定する。  
```
$ sam package --template-file template.yaml --s3-bucket <bucketName> ¥
--output-template-file packaged.yaml
$ aws cloudformation deploy --template-file ./packaged.yaml --stack-name <stackName> ¥
--capabilities CAPABILITY_IAM
```
  
## 課題
cloudformationからデプロイ時にLambda実行ロールが自動作成されるが、  
ロールの権限をどこで指定するのか要調査  
現状だとAWSLambdaBasicExecutionRoleポリシーのみが付与されている。  
今後S3アクセス、DBアクセスなどLambdaにやらせようとすると権限追加必須。  
  
## 余談
S3にコンテンツを置かずにLambda関数内に置くのは、コンテンツを修正する度にS3にファイルをアップロードするのが面倒だからで、  
Lambda関数内に置くことで、コンソール画面上でソースコードと同様にエディタで修正・反映を可能にし、  
コンソール画面上だけでコンテンツの追加・編集を完結させたかったから。  
が一式gitでバージョン管理したり、ローカルで動作確認できるようにしたり等を考慮すると、  
結局ローカルで編集しAWS環境にアップロードする流れにせざるを得ない。  
コンソールでの編集をローカルにフィードバックさせる仕組みがあれば良いのだが、、  
  
  

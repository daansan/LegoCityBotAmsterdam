#create dataset
curl -X POST -H "Authorization: Bearer 3WEAMWUYFOJEDDL36AVDUIJ4NGTDONWOELWJQV3FQ6LFISEZIMOM5RLQMVKOZ62XWVQRGV3EBOSA6DY4NQ7NXJLWZWQGLHA53YTG5BY" -H "Cache-Control: no-cache" -H "Content-Type: multipart/form-data" -F "path=http://legocitybotdvs.herokuapp.com/EinsteinIntents.json" -F "type=text-intent" -F "name=Amsterdam Lego City Intent Routing" https://api.einstein.ai/v2/language/datasets/upload

    #output is:
    ##{"id":1041763,"name":"Amsterdam Lego City Intent Routing","createdAt":"2018-03-01T13:11:37.000+0000","updatedAt":"2018-03-01T13:11:37.000+0000","labelSummary":{"labels":[]},"totalExamples":0,"available":false,"statusMsg":"UPLOADING","type":"text-intent","object":"dataset"}

#verify data loaded, include dataset id from previous call in this call
curl -X GET -H "Authorization: Bearer 3WEAMWUYFOJEDDL36AVDUIJ4NGTDONWOELWJQV3FQ6LFISEZIMOM5RLQMVKOZ62XWVQRGV3EBOSA6DY4NQ7NXJLWZWQGLHA53YTG5BY" -H "Cache-Control: no-cache" https://api.einstein.ai/v2/language/datasets/1041763

    #output is:
    ##{"id":1041763,"name":"Amsterdam Lego City Intent Routing","createdAt":"2018-03-01T13:11:37.000+0000","updatedAt":"2018-03-01T13:11:38.000+0000","labelSummary":{"labels":[{"id":614396,"datasetId":1041763,"name":"Greetings","numExamples":36},{"id":614397,"datasetId":1041763,"name":"InfoCar","numExamples":10}]},"totalExamples":46,"totalLabels":2,"available":true,"statusMsg":"SUCCEEDED","type":"text-intent","object":"dataset"}

#when available=true and statusMsg=SUCCEEDED we can train the model, include dataset id again
curl -X POST -H "Authorization: Bearer 3WEAMWUYFOJEDDL36AVDUIJ4NGTDONWOELWJQV3FQ6LFISEZIMOM5RLQMVKOZ62XWVQRGV3EBOSA6DY4NQ7NXJLWZWQGLHA53YTG5BY" -H "Cache-Control: no-cache" -H "Content-Type: multipart/form-data" -F "name=Lego City Intent Routing Model" -F "datasetId=1041763" https://api.einstein.ai/v2/language/train

    #output is:
    ##{"datasetId":1041763,"datasetVersionId":0,"name":"Lego City Intent Routing Model","status":"QUEUED","progress":0,"createdAt":"2018-03-01T13:17:46.000+0000","updatedAt":"2018-03-01T13:17:46.000+0000","learningRate":0.0,"epochs":0,"queuePosition":1,"object":"training","modelId":"WCDGDOOMAIF6EIVMCCFCPPTUQU","trainParams":null,"trainStats":null,"modelType":"text-intent"}

#get the training status, include the model id from the previous call
curl -X GET -H "Authorization: Bearer 3WEAMWUYFOJEDDL36AVDUIJ4NGTDONWOELWJQV3FQ6LFISEZIMOM5RLQMVKOZ62XWVQRGV3EBOSA6DY4NQ7NXJLWZWQGLHA53YTG5BY" -H "Cache-Control: no-cache" https://api.einstein.ai/v2/language/train/WCDGDOOMAIF6EIVMCCFCPPTUQU

    #output is:
    ##{"datasetId":1041763,"datasetVersionId":20794,"name":"Lego City Intent Routing Model","status":"RUNNING","progress":0.01,"createdAt":"2018-03-01T13:17:46.000+0000","updatedAt":"2018-03-01T13:18:51.000+0000","learningRate":0.0,"epochs":1000,"object":"training","modelId":"WCDGDOOMAIF6EIVMCCFCPPTUQU","trainParams":null,"trainStats":null,"modelType":"text-intent"}

#send text for prediction, include the model id again
curl -X POST -H "Authorization: Bearer 3WEAMWUYFOJEDDL36AVDUIJ4NGTDONWOELWJQV3FQ6LFISEZIMOM5RLQMVKOZ62XWVQRGV3EBOSA6DY4NQ7NXJLWZWQGLHA53YTG5BY" -H "Cache-Control: no-cache" -H "Content-Type: multipart/form-data" -F "modelId=WCDGDOOMAIF6EIVMCCFCPPTUQU" -F "document=wassup" https://api.einstein.ai/v2/language/intent

    #output is:
    ##{"probabilities":[{"label":"Greetings","probability":0.92111164},{"label":"InfoCar","probability":0.07888832}],"object":"predictresponse"}
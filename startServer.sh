#!/bin/bash

echo -e 'Server started'
PORT=3002 DB=postgres://soyaku@localhost/other_note AWS_ACCESS_KEY_ID=AKIAIQZ6X7TMPAIAEQUQ AWS_SECRET_ACCESS_KEY=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  AWS_BUCKET=othernote nodemon server/index.js 


import { NestFactory } from '@nestjs/core';
import { SwaggerModule , DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import *  as  cookieParser from "cookie-parser";
import * as session from 'express-session';

const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态服务目录
  // app.useStaticAssets("public")
  // 配置虚拟目录
  app.useStaticAssets("public", {
    prefix: "/static/"
  })
  // 设置模板目录
  app.setBaseViewsDir("views");
  app.setViewEngine("ejs");
  app.use(cookieParser());

  //配置session的中间件
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 219000, httpOnly: true },
    rolling: true
  }));


  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('铲粑粑')
    .setDescription('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvd0I0NzQycWFLT2dpX3ctVmMzNXFsZGlJRk9ZIiwiaWF0IjoxNjEzNjE0OTQxLCJleHAiOjE2MTYyMDY5NDF9.olWMrkUM6rNPD-ZxlSqFkZagULCYJCgQjFmH350cvX4')
    .addBearerAuth({
          type: 'apiKey',
          description: '身份校验',
          name: 'Authorization',
          in:'header'
    })
    .setBasePath("http://natapp.gek6.com")
    .setVersion('1.0')

    .build()
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api-docs',app,document);
  app.use(bodyParser.xml());
  await app.listen(3000);
}
bootstrap();

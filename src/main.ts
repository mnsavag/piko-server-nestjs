import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { urlencoded, json } from 'express';


async function start() {
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule)
    
    const config = new DocumentBuilder()
        .setTitle('Piko')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    
    app.enableCors();
    await app.listen(3001);

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    await app.listen(PORT, () => console.log("Server started"))
}

start()

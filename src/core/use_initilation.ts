import { ValidationPipe, INestApplication } from "@nestjs/common";
import { } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MulterValidationExceptionFilter } from "./error/validation.filter";
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'; // Import SwaggerTheme

export const initGlobalApp = (app: INestApplication) => {
    const config = new DocumentBuilder().setTitle("Edfix Clone").build()
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))

    app.setGlobalPrefix("api")


    const document = SwaggerModule.createDocument(app, config)

    const theme = new SwaggerTheme();
    const darkThemeCss = theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK);

    SwaggerModule.setup("api-docs", app, document, {
        customCss: darkThemeCss, // Apply the dark theme CSS
        customSiteTitle: 'My API Docs', // Optional: Customize site title
    })


    app.useGlobalFilters(new MulterValidationExceptionFilter())
    app.enableCors()
}
// Memory monitoring function
export function logMemoryUsage(label = 'Memory Usage') {
  const memUsage = process.memoryUsage();
  const formatMB = (bytes) => Math.round(bytes / 1024 / 1024 * 100) / 100;
  
  console.log(`\n=== ${label} ===`);
  console.log(`RSS (Resident Set Size): ${formatMB(memUsage.rss)} MB`);
  console.log(`Heap Used: ${formatMB(memUsage.heapUsed)} MB`);
  console.log(`Heap Total: ${formatMB(memUsage.heapTotal)} MB`);
  console.log(`External: ${formatMB(memUsage.external)} MB`);
  console.log(`Array Buffers: ${formatMB(memUsage.arrayBuffers)} MB`);
  
  // System memory ma'lumoti (agar mavjud bo'lsa)
  if (process.platform !== 'win32') {
    try {
      const os = require('os');
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      
      console.log(`\n--- System Memory ---`);
      console.log(`Total System Memory: ${formatMB(totalMem)} MB`);
      console.log(`Used System Memory: ${formatMB(usedMem)} MB`);
      console.log(`Free System Memory: ${formatMB(freeMem)} MB`);
      console.log(`Memory Usage: ${((usedMem / totalMem) * 100).toFixed(2)}%`);
    } catch (error) {
      console.log('System memory info not available');
    }
  }
  console.log('========================\n');
}

// Detailed memory monitoring with garbage collection info
export function detailedMemoryLog(label = 'Detailed Memory') {
  // Force garbage collection agar expose-gc flag bilan ishga tushirilgan bo'lsa
  if (global.gc) {
    console.log('Running garbage collection...');
    global.gc();
  }
  
  const memUsage = process.memoryUsage();
  const formatMB = (bytes) => Math.round(bytes / 1024 / 1024 * 100) / 100;
  
  console.log(`\n=== ${label} ===`);
  console.log(`Process ID: ${process.pid}`);
  console.log(`Uptime: ${Math.round(process.uptime())} seconds`);
  console.log(`Node.js Version: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  
  console.log(`\n--- Memory Details ---`);
  console.log(`RSS: ${formatMB(memUsage.rss)} MB (Physical memory currently used)`);
  console.log(`Heap Used: ${formatMB(memUsage.heapUsed)} MB (V8 heap memory used)`);
  console.log(`Heap Total: ${formatMB(memUsage.heapTotal)} MB (V8 heap memory allocated)`);
  console.log(`External: ${formatMB(memUsage.external)} MB (C++ objects bound to JS)`);
  console.log(`Array Buffers: ${formatMB(memUsage.arrayBuffers)} MB (ArrayBuffers and SharedArrayBuffers)`);
  
  // Heap usage percentage
  const heapUsagePercent = ((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2);
  console.log(`Heap Usage: ${heapUsagePercent}%`);
  
  console.log('===========================\n');
}

// Memory monitoring wrapper function
export function withMemoryMonitoring(asyncFunction, label) {
  return async function(...args) {
    logMemoryUsage(`${label} - Before`);
    
    const startTime = Date.now();
    try {
      const result = await asyncFunction.apply(this, args);
      const endTime = Date.now();
      
      logMemoryUsage(`${label} - After (${endTime - startTime}ms)`);
      return result;
    } catch (error) {
      const endTime = Date.now();
      logMemoryUsage(`${label} - Error (${endTime - startTime}ms)`);
      throw error;
    }
  };
}



// Memory alert export function - agar memory ko'p ishlatilsa ogohlantirish
export function setupMemoryAlerts(thresholdMB = 500) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const rssInMB = memUsage.rss / 1024 / 1024;
    
    if (rssInMB > thresholdMB) {
      console.warn(`⚠️  HIGH MEMORY USAGE ALERT: ${Math.round(rssInMB)} MB (Threshold: ${thresholdMB} MB)`);
      detailedMemoryLog('High Memory Usage Alert');
    }
  }, 10000); // Har 10 soniyada tekshirish
}

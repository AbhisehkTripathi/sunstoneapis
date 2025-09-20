import { AppDataSource } from "../config/database";
import moment from "moment";

export const apiLogger = async ({
  service_name,
  req,
  res,
  requestBody = {},
  requestHeaders = {},
  responseBody = {},
  responseStatus,
  errorMessage = null,
  startTime
}: any) => {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    const processingTime = startTime ? Date.now() - startTime : null;

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("api_logs")
      .values({
        service_name,
        request_time: moment().utc(false).toDate(),
        processing_time: processingTime,
        method: req?.method || null,
        url: req?.originalUrl || req?.url || null,
        http_version: req?.httpVersion || null,
        request_headers: JSON.stringify(req?.headers || requestHeaders),
        request_body: JSON.stringify(req?.body || requestBody),
        response_status_code: responseStatus || res?.statusCode || null,
        response_status_message: res?.statusMessage || null,
        response_headers: JSON.stringify(res?.getHeaders?.() || {}),
        response_body: JSON.stringify(responseBody),
        error_message: errorMessage,
        created_at: moment().utc(false).toDate()
      })
      .execute();
  } catch (err) {
    console.error("Failed to log API:", err);
  } finally {
    await queryRunner.release();
  }
};

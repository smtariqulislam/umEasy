using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
namespace GrapesTl.Utility;

public class FileUploadService : IFileUploadService
{
    //public async Task<string> UploadFileAsync(IFormFile file)
    //{
    //    try
    //    {
    //        // Load Google credentials from the environment or a file.
    //        GoogleCredential credential = await GoogleCredential.GetApplicationDefaultAsync();
    //        credential = credential.CreateScoped(DriveService.Scope.DriveFile);

    //        // Create Drive API service.
    //        var service = new DriveService(new BaseClientService.Initializer
    //        {
    //            HttpClientInitializer = credential,
    //            ApplicationName = "Drive API Snippets"
    //        });

    //        // Create metadata for the file to be uploaded.
    //        var fileMetadata = new Google.Apis.Drive.v3.Data.File()
    //        {
    //            Name = file.FileName
    //        };

    //        // Upload the file to Google Drive.
    //        FilesResource.CreateMediaUpload request;
    //        using (var stream = new MemoryStream())
    //        {
    //            await file.CopyToAsync(stream);
    //            stream.Seek(0, SeekOrigin.Begin);

    //            request = service.Files.Create(
    //                fileMetadata, stream, file.ContentType);
    //            request.Fields = "id";
    //            await request.UploadAsync();
    //        }

    //        var uploadedFile = request.ResponseBody;

    //        // Return the file ID.
    //        return uploadedFile.Id;
    //    }
    //    catch (Exception e)
    //    {
    //        // Handle exceptions.
    //        Console.WriteLine($"Error uploading file: {e.Message}");
    //        return null;
    //    }
    //}

    public async Task<string> GetUploadIdAsync(IFormFile file)
    {
        try
        {
            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);

            var data = new
            {
                data = memoryStream.ToArray(),
                name = file.FileName,
                type = file.ContentType
            };

            var dataSendPayLoad = new
            {
                dataReq = data,
                fname = "uploadFilesToGoogleDrive",
            };

            var response = await SD.DriveUrl
                    .PostJsonAsync(dataSendPayLoad)
                   .ReceiveJson<FileUploadResponse>();

            return string.IsNullOrWhiteSpace(response.Id) == true ? "" : response.Id;
        }
        catch (FlurlHttpException ex)
        {
            return ex.Message;
        }
    }

    public async Task<string> GetUploadUrlAsync(IFormFile file)
    {
        try
        {

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);

            var data = new
            {
                data = memoryStream.ToArray(),
                name = file.FileName,
                type = file.ContentType
            };

            var dataSendPayLoad = new
            {
                dataReq = data,
                fname = "uploadFilesToGoogleDrive",
            };

            var response = await SD.DriveUrl
                    .PostJsonAsync(dataSendPayLoad)
                   .ReceiveJson<FileUploadResponse>();

            return string.IsNullOrWhiteSpace(response.Url) == true ? "" : response.Url;
        }
        catch (FlurlHttpException ex)
        {
            return ex.Message;
        }
    }

    private class FileUploadResponse
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("url")]
        public string Url;
    }

}

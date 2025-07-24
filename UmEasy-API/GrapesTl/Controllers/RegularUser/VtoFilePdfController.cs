namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class VtoFilePdfController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    [HttpGet("Preview/{id}")]
    public async Task<IActionResult> Preview(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FileId", id);

            var vtoFileDetails = await _unitOfWork.SP_Call.OneRecord<VtoFolderView>("OsVtoFileGetById", parameter);

            var coreValue = await _unitOfWork.SP_Call.List<CoreValue>("OsVisionCoreValueGetAll", parameter);
            var coreFocus = await _unitOfWork.SP_Call.List<CoreFocus>("OsVisionCoreFocusGetAll", parameter);
            var tenYearsTarget = await _unitOfWork.SP_Call.List<TenYearsTarget>("OsVisionTenYearTargetGetAll", parameter);
            var marketingStrategy = await _unitOfWork.SP_Call.List<MarketingStrategy>("OsVisionMarketingStrageGetAll", parameter);
            var threeYearTarget = await _unitOfWork.SP_Call.List<ThreeYearTarget>("OsVisionThreeYearGetAll", parameter);

            var tractionOneYearPlan = await _unitOfWork.SP_Call.List<TractionOneYearPlan>("OsTractionOneYearPlanGetAll", parameter);
            var tractionOneYearPlanGoal = await _unitOfWork.SP_Call.List<TractionOneYearPlanGoal>("OsTractionOneYearPlanGoalGetAll", parameter);
            var tractionRocks = await _unitOfWork.SP_Call.List<TractionRockView>("OsTractionRockGetAll", parameter);
            var tractionIssuesList = await _unitOfWork.SP_Call.List<IssueVtoView>("OsIssueVtoGetByFileId", parameter);

            //var data = new
            //{
            //    CoreValue = coreValue,
            //    CoreFocus = coreFocus,
            //};

            var sb = new StringBuilder();


            sb.Append($"<table style='width: 100%;font-family: Helvetica; font-size: 10px'>");
            sb.Append($"<!-- Header -->");
            sb.Append($"<tr>");
            sb.Append($"<td>");
            sb.Append($"<h1 style='text-align: center'>The Vision/Traction Organizer</h1>");
            sb.Append($"<table style='width: 100%'>");
            sb.Append($"<tr>");
            sb.Append($"<td>Owner : {vtoFileDetails.FullName}</td>");
            sb.Append($"<td>Folder : {vtoFileDetails.FolderName}</td>");
            sb.Append($"<td>File :{vtoFileDetails.FileName}</td>");
            sb.Append($"<td>Status :{vtoFileDetails.Status}</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"<!-- End Header -->");
            sb.Append($"<!-- Vision -->");
            sb.Append($"<tr style='width: 100%; font-family: Helvetica; font-size: 10px'>");
            sb.Append($"<td>");
            sb.Append($"<h1 style='text-align: center'>The Vision</h1>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 0px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr>");
            sb.Append($"<td  style='width: 70%;vertical-align: top;'>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='width: 30%; background-color: #faae40; border: 1px solid; border-color: black; border-collapse: collapse; text-align: center;'>");
            sb.Append($"Core Values");
            sb.Append($"</td>");
            sb.Append($"<td style='padding:5px'><ul>");
            //core values
            foreach (var item in coreValue)
            {
                sb.Append($"<li>{item.CoreValueName}</li>");
            }
            sb.Append($"</ul></td>");
            sb.Append($"</tr>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='width: 30%; background-color: #faae40; border: 1px solid; border-color: black; border-collapse: collapse; text-align: center;'>");
            sb.Append($"Core Focus");
            sb.Append($"</td>");
            sb.Append($"<td style='padding:5px'>");
            //core values
            foreach (var item in coreFocus)
            {
                sb.Append("<div style='margin:10px;'>");
                sb.Append($"<span>{item.PurposeCause} : {item.Description}</span>");
                sb.Append($"<br/>");
                sb.Append($"<span>Our Niche: {item.OurNiche}</span>");
                sb.Append("</div>");
            }
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='width: 30%; background-color: #faae40; border: 1px solid; border-color: black; border-collapse: collapse; text-align: center;'>");
            sb.Append($"TARGET");
            sb.Append($"</td>");
            sb.Append($"<td style='padding:5px'>");
            //Ten Years
            foreach (var item in tenYearsTarget)
            {
                sb.Append("<div style='margin:10px;'>");
                sb.Append($"<span>{item.TenYearsTargetName} : <div dangerouslySetInnerHTML=__html: {item.Note}</div> </span>");
                sb.Append("</div>");
            }
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='width: 30%; background-color: #faae40; border: 1px solid; border-color: black; border-collapse: collapse; text-align: center;'>");
            sb.Append($"Marketing");
            sb.Append($"</td>");
            sb.Append($"<td>");
            foreach (var item in marketingStrategy)
            {
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>Target Market/The List: </b>{item.TargetMarketName}</span>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span><b>3 Uniques: </b></span><ol><li>{item.Uniques1} </li>");
                sb.Append($"<li>{item.Uniques2} </li>");
                sb.Append($"<li>{item.Uniques3} </li>");
                sb.Append("</ol></div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>Proven Process:</b> {item.ProvenProcess}</span>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b> Guarntee:</b> {item.SystemPromise}</span>");
                sb.Append("</div>");
            }
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"<td style='width:30%;vertical-align: top'>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='text-align:center;background-color: #faae40'>3-YEAR PICTURE</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr>");
            sb.Append($"<td>");
            foreach (var item in threeYearTarget)
            {
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>FutureDate: </b>{item.FutureDate.ToString("dd/MMM/yyyy")}</span>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span> <b>Revenue: </b></span><li>{item.Revenue} </li>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>Profit:</b> {item.Profit}</span>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b> Measurable:</b></span>");
                sb.Append($"<div dangerouslySetInnerHTML=__html: {item.Measurable}</div></div>");
                sb.Append($"</div>");
                sb.Append($"<div style='margin:5px;'>");
                sb.Append($"<span><b> WhatDoesItLookLike:</b></span>");
                sb.Append($"<div dangerouslySetInnerHTML=__html: {item.WhatDoesItLookLike}</div></div>");
            }
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"<!-- End Vision -->");
            sb.Append($"<!-- Traction -->");
            sb.Append($"<tr style='width: 100%; font-family: Helvetica; font-size: 10px;'>");
            sb.Append($"<td>");
            sb.Append($"<h1 style='text-align: center'>The Traction</h1>");
            sb.Append($"<table style='width: 100%'>");
            sb.Append($"<tr stly='display:grid'>");
            sb.Append($"<td style='width:33.33%;vertical-align: top'>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr style='width: 50%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='background-color: #faae40;text-align:center'>1-YEAR PLAN</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr>");
            sb.Append($"<td>");
            // 1 year plan

            foreach (var item in tractionOneYearPlan)
            {
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>FutureDate: </b>{item.FutureDate.ToString("dd/MMM/yyyy")}</span>");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span> <b>Revenue: </b></span>{item.Revenue} ");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>Profit:</b> {item.Profit}</span>");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span><b> Measurables:</b> {item.Measurables}</span>");
            }

            sb.Append("<div>");
            sb.Append("<span><b>Goal For the Year:</b></span>");

            // Create ordered list for goals
            sb.Append("<ol style='margin:5px;'>");

            foreach (var item in tractionOneYearPlanGoal)
            {
                sb.Append($"<li>{item.Goal}</li>");
            }

            // Close the ordered list and goal section
            sb.Append("</ol>");
            sb.Append("</div>");

            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"<td style='width:33.33%;vertical-align: top'>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='background-color: #faae40;text-align:center'>ROCKS</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr>");
            sb.Append($"<td>");
            foreach (var item in tractionRocks)
            {
                sb.Append("<div style='margin:5px;'>");
                //sb.Append($"<span><b>FutureDate: </b>{item.FutureDate.ToString("dd/MMM/yyyy")}</span>");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span> <b>RockOwner: </b></span>{item.RockOwnerName} ");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'>");
                sb.Append($"<span><b>Rock:</b> {item.Rock}</span>");

                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> ");
                sb.Append($"<span><b> Goal:</b> {item.Goal}</span>");

                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("<div style='margin:5px;'> <ol>");
                //sb.Append($"<span><b> Rocks For Quratar:</b><br> <li>{item.Rock1}</li></span>");
                //sb.Append($"<span> <li>{item.Rock2}</li></span>");
                //sb.Append($" <li>{item.Rock3}</li></span>");
                //sb.Append($" <li>{item.Rock4}</li></span>");
                //sb.Append($" <li>{item.Rock5}</li></span>");
                //sb.Append($" <li>{item.Rock6}</li></span>");
                //sb.Append($" <li>{item.Rock7}</li></span>");
                //sb.Append($" <li>{item.Rock8}</li></span>");


                sb.Append("</ol></div>");
            }
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"<td style='width:33.33%;vertical-align: top'>");
            sb.Append($"<table style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<tr style='width: 100%; background-color: white; border: 1px solid; border-color: black; border-collapse: collapse;'>");
            sb.Append($"<td style='background-color: #faae40;text-align:center'>ISSUES LIST</td>");
            sb.Append($"</tr>");
            sb.Append($"<tr>");
            sb.Append($"<td>");
            sb.Append($"<ul>");
            foreach (var item in tractionIssuesList)
            {
                sb.Append("<li>");
                sb.Append($"<div><b>{item.Title}</b></div>");
                sb.Append($"<div>{item.FullName}</div>");
                sb.Append("</li>");
            }
            sb.Append("</ul>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"</table>");
            sb.Append($"</td>");
            sb.Append($"</tr>");
            sb.Append($"<!-- End Traction -->");
            sb.Append($"</table>");

            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Ledger.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
}

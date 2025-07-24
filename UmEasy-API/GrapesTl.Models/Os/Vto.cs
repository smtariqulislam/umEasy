namespace GrapesTl.Models;


public class VtoFolder
{
    public string FolderName { get; set; }
    public string FolderId { get; set; }
}

public class VtoFolderView : VtoFolder
{
    public string FileId { get; set; }
    public string FileName { get; set; }
    public string Status { get; set; }
    public string CreateDate { get; set; }
    public string FullName { get; set; }
    public int IsPublic { get; set; }

}

public class VtoFile
{
    public string FolderId { get; set; }
    public string FileName { get; set; }

}







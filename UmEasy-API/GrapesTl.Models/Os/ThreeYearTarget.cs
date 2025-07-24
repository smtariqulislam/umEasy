using System;
namespace GrapesTl.Models;

public class ThreeYearTarget
{
    public int ThreeYearId { get; set; }
    public int FileId { get; set; }
    public DateTime FutureDate { get; set; }
    public string Revenue { get; set; }
    public string Profit { get; set; }
    public string Measurable { get; set; }
    public string WhatDoesItLookLike { get; set; }


}

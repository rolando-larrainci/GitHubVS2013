using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApiService.Models
{
    public class Feature
    {
        public long FeatureId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        //public Product Product { get; set; }
        public long ProductId { get; set; }
    }
}

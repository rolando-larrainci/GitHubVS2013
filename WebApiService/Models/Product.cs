using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiService.Models
{
    public class Product
    {
        public long ProductId { get; set; }
        public List<Review> Reviews { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Feature> Features { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiService.Models
{
    public class Review
    {
        public long ReviewId { get; set; }
        public string UserName { get; set; }
        public string Body { get; set; }
        public DateTimeOffset Date { get; set; }
        //public Product Product { get; set; }
        public long ProductId { get; set; }
    }
}
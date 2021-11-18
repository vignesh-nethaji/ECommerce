using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Models
{
   public class Product
    {
        public int Id { get; set; }
        public string title { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        public string image { get; set; }

        public virtual Catagory Catagory { get; set; }
    }
}

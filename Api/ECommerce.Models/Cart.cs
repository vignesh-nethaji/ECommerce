using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Quantity { get; set; }

        public virtual User User { get; set; }
        public virtual Product Product { get; set; }

    }
}

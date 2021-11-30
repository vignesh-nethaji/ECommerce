using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ECommerce.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Quantity { get; set; }
        [ForeignKey("UserId")]
        public int UserId { get; set; }

        [ForeignKey ("ProductId")]
        public int ProductId { get; set; }
        public virtual User User { get; set; }
        public virtual Product Product { get; set; }

    }
}

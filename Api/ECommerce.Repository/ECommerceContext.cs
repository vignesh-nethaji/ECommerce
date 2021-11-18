using ECommerce.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository
{
    public class ECommerceContext : DbContext
    {
        public ECommerceContext(DbContextOptions<ECommerceContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; } 
        public DbSet<Category> Catagory { get; set; } 
        public DbSet<Product> Product { get; set; } 
        public DbSet<Cart> Cart { get; set; } 
    }
}

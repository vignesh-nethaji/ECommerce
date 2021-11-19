using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Implementation
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ECommerceContext context) : base(context)
        {

        }
    }
}

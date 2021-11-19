using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Implementation
{
    public class CategoryRepository:BaseRepository<Category>,ICategoryRepository
    {
        public CategoryRepository(ECommerceContext Context): base(Context)
        {

        }
    }
}

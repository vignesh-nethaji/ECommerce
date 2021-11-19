using ECommerce.Models;
using ECommerce.Repository.Migrations;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Interfaces
{
    public interface IProductService : IDisposable
    {
        Task<List<Product>> GetAll();
        Task<Product> Get(int id);
        Task<Product> Insert(Product product);
        Task<Product> Update(Product product);
        Task Delete(int id);
        
    }
}


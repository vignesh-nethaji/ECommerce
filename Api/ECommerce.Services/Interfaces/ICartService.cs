using ECommerce.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Interfaces
{
    public interface ICartService : IDisposable
    {
        Task<List<Cart>> GetAll();
        Task<Cart> Get(int id);
        Task<Cart> Insert(Cart cart);
        Task<Cart> Update(Cart cart);
        Task Delete(int id);
        Task<List<Product>> GetProducts(int userId);
    }

}

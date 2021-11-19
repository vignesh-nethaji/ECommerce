using ECommerce.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Interfaces
{

    public interface ICategoryService : IDisposable
    {
        Task<List<Category>> GetAll();
        Task<Category> Get(int id);
        Task<Category> Insert(Category category);
        Task<Category> Update(Category category);
        Task Delete(int id);
    }

}


using ECommerce.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Interfaces
{
    public interface IUserService : IDisposable
    {
        Task<List<User>> GetAll();
        Task<User> Get(int id);
        Task<User> Insert(User user);
        Task<User> Update(User user);
        Task Delete(int id);
    }
}

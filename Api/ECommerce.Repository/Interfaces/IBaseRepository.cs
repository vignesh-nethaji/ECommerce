using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Repository.Interfaces
{
    public interface IBaseRepository<T> : IDisposable
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Insert(T obj);
        Task Delete(int id);
        Task<T> Update(T obj);
    }
}

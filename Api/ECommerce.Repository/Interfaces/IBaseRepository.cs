using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Interfaces
{
    public interface IBaseRepository<T> : IDisposable
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Insert(T obj);
        void Delete(int id);
        void Update(T obj);
    }
}

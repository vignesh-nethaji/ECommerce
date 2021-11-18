using ECommerce.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Implementation
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ECommerceContext DbContext;
        public BaseRepository(ECommerceContext context)
        {
            DbContext = context;
        }

        public void Delete(int id)
        {
            T obj = DbContext.Set<T>().Find(id);
            DbContext.Set<T>().Remove(obj);
            DbContext.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return DbContext.Set<T>();
        }

        public T GetById(int id)
        {
            return DbContext.Set<T>().Find(id);

        }

        public void Insert(T obj)
        {
            DbContext.Set<T>().Add(obj);
            DbContext.SaveChanges();
        }


        public void Update(T obj)
        {
            DbContext.Entry(obj).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    DbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}

using ECommerce.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Repository.Implementation
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ECommerceContext DbContext;
        public BaseRepository(ECommerceContext context)
        {
            DbContext = context;
        }

        public async Task Delete(int id)
        {
            T obj = DbContext.Set<T>().Find(id);
            DbContext.Set<T>().Remove(obj);
            await DbContext.SaveChangesAsync();
        }

        public async Task<List<T>> GetAll()
        {
            return await DbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await DbContext.Set<T>().FindAsync(id);
        }
        
        public async Task<T> Insert(T obj)
        {
            var data = DbContext.Set<T>().Add(obj);
            await DbContext.SaveChangesAsync();
            return data.Entity;
        }


        public async Task<T> Update(T obj)
        {
            DbContext.Entry(obj).State = EntityState.Modified;
            await DbContext.SaveChangesAsync();
            return obj;
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    DbContext.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}

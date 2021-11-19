using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Implementation
{
    class CategoryService : ICategoryService, IDisposable
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public void Dispose()
        {
            _categoryRepository.Dispose();
        }

        public async Task<List<Category>> GetAll()
        {
            return await _categoryRepository.GetAll();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Category> Get(int id)
        {
            return await _categoryRepository.GetById(id);
        }

        public async Task<Category> Insert(Category category)
        {
            return await _categoryRepository.Insert(category);
        }

        public async Task<Category> Update(Category category)
        {
            return await _categoryRepository.Update(category);
        }

        public async Task Delete(int id)
        {
            await _categoryRepository.Delete(id);
        }
    
    }
}

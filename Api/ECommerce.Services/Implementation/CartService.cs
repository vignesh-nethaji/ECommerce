using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Implementation
{
     public class CartService : ICartService, IDisposable
    {
        private readonly ICartRepository _cartRepository;
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public void Dispose()
        {
            _cartRepository.Dispose();
        }

        public async Task<List<Cart>> GetAll()
        {
            return await _cartRepository.GetAll();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Cart> Get(int id)
        {
            return await _cartRepository.GetById(id);
        }

        public async Task<Cart> Insert(Cart cart)
        {
            return await _cartRepository.Insert(cart);
        }

        public async Task<Cart> Update(Cart cart)
        {
            return await _cartRepository.Update(cart);
        }

        public async Task Delete(int id)
        {
            await _cartRepository.Delete(id);
        }

    }

}

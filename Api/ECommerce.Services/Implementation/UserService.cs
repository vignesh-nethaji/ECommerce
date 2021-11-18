using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Implementation
{
    public class UserService : IUserService, IDisposable
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Dispose()
        {
            _userRepository.Dispose();
        }

        public async Task<List<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }

        public async Task<User> Get(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<User> Insert(User user)
        {
            return await _userRepository.Insert(user);
        }

        public async Task<User> Update(User user)
        {
            return await _userRepository.Update(user);
        }

        public async Task Delete(int id)
        {
            await _userRepository.Delete(id);
        }
    }
}

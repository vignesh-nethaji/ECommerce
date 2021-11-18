using ECommerce.Repository.Interfaces;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
    }
}

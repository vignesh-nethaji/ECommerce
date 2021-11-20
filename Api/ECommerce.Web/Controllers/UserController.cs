using ECommerce.Models;
using ECommerce.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Models.ViewModels;
using ECommerce.Web.Helper;

namespace ECommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase, IDisposable
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        public void Dispose()
        {
            _userService.Dispose();
        }

        /// <summary>
        /// Get All user data
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            ResponseData<List<User>> response = new ResponseData<List<User>>();
            try
            {
                response.Message = "Read user list";
                response.Data = await _userService.GetAll();
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        /// <summary>
        /// Get user  by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            ResponseData<User> response = new ResponseData<User>();
            try
            {
                response.Message = "User data read by id";
                response.Data = await _userService.Get(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        /// <summary>
        /// Add user data
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] User obj)
        {
            ResponseData<User> response = new ResponseData<User>();
            try
            {
                response.Data = await _userService.Insert(obj);
                response.Message = "User data Added";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        /// <summary>
        /// Update user Data
        /// </summary>
        /// <returns></returns>
        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] User obj)
        {
            ResponseData<User> response = new ResponseData<User>();
            try
            {
                response.Data = await _userService.Update(obj);
                response.Message = "User data updated";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        /// <summary>
        /// Delete user by id
        /// </summary>
        /// <returns></returns>
        [HttpDelete("Delete/{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            ResponseData<int> response = new ResponseData<int>();
            try
            {
                response.Data = id;
                response.Message = "user Deleted";
                await _userService.Delete(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}

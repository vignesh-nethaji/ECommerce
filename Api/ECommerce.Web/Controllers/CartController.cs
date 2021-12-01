using ECommerce.Models;
using ECommerce.Models.ViewModels;
using ECommerce.Services.Interfaces;
using ECommerce.Web.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase, IDisposable
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        public void Dispose()
        {
            _cartService.Dispose();
        }

        /// <summary>
        /// Get All Cart products
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            ResponseData<List<Cart>> response = new ResponseData<List<Cart>>();
            try
            {
                response.Message = "Read Cart products";
                response.Data = await _cartService.GetAll();
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
        /// Get Cart Details 
        /// </summary>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            ResponseData<Cart> response = new ResponseData<Cart>();
            try
            {
                response.Message = "Cart by id";
                response.Data = await _cartService.Get(id);
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
        /// Add Cart 
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        [Authorize]
        public async Task<IActionResult> Add([FromBody] Cart obj)
        {
            ResponseData<Cart> response = new ResponseData<Cart>();
            try
            {
                response.Data = await _cartService.Insert(obj);
                response.Message = " Product is added in cart";
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
        /// Update Cart Product
        /// </summary>
        /// <returns></returns>
        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] Cart obj)
        {
            ResponseData<Cart> response = new ResponseData<Cart>();
            try
            {
                response.Data = await _cartService.Update(obj);
                response.Message = "Cart data is updated";
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
        /// Delete cart product 
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
                response.Message = "cart Deleted";
                await _cartService.Delete(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpGet("GetProducts/{id}")]
        [Authorize]
        public async Task<IActionResult> GetProducts(int id)
        {
            ResponseData<List<Product>> response = new ResponseData<List<Product>>();
            try
            {
                response.Message = "Cart by id";
                response.Data = await _cartService.GetProducts(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }
    }
}


require 'multi_json'
require "oauth"
require "oauth/consumer"
require 'sinatra'
require "sinatra/multi_route"
require "sinatra/reloader" if development?
# require "rack-streaming-proxy"

enable :sessions

use Rack::Session::Cookie

before do
  session[:handshake] ||= {}  
  @consumer ||=OAuth::Consumer.new "GoQa71VgstbChbLea2Y8dw", "Vqgg7uUlmj2GOz5elBv2MWiA31J9G6i5is3IL46vTY", {
    :site => "https://api.twitter.com"
  }
  
  if !session[:handshake][:request_token].nil? && !session[:handshake][:request_token_secret].nil?
    @request_token = OAuth::RequestToken.new(@consumer, session[:handshake][:request_token], session[:handshake][:request_token_secret])
  end
  
  uid = params.delete('user_id')
  if uid && oauth = session[uid]
    @access_token = OAuth::AccessToken.new(@consumer, oauth[:access_token], oauth[:access_token_secret])
  end
end

route :get, :post, :put, "/proxy" do
  halt(401) unless @access_token
  url = CGI::unescape(params[:url])
  method = request.request_method.downcase.to_sym
  begin
    response = @access_token.request(method, url, request.body.read).body
  rescue ::Errno::ETIMEDOUT
    raise ::Timeout::Error
  end
  response           
end

get "/auth/twitter" do
  @request_token = @consumer.get_request_token(:oauth_callback => "http://#{request.host_with_port}/api/auth/callback")
  session[:handshake][:request_token] = @request_token.token
  session[:handshake][:request_token_secret] = @request_token.secret
  redirect @request_token.authorize_url + "&force_login=true&screen_name=#{params[:screen_name]}"
end

get "/auth/callback" do
  @access_token = @request_token.get_access_token :oauth_verifier => params[:oauth_verifier]
  
  uid = raw_info['id']
  
  ret = {}
  ret[:uid]            = uid
  ret[:name]           = raw_info['name']
  ret[:screenName]     = raw_info['screen_name']
  ret[:profilePicURL]  = raw_info['profile_image_url_https']
  ret[:numOfFollowers] = raw_info['followers_count']
  
  session[uid] = {}
  session[uid][:access_token] = @access_token.token
  session[uid][:access_token_secret] = @access_token.secret
  session[:handshake] = nil
  
  <<-HTML
  <script>
  window.opener.App.mainController.send('authComplete', #{MultiJson.encode(ret)} );
  </script>
  HTML
end

get "/auth/logout" do
  session = {}
end

def raw_info
  @raw_info ||= MultiJson.decode(@access_token.get('/1/account/verify_credentials.json').body)
rescue ::Errno::ETIMEDOUT
  raise ::Timeout::Error
end
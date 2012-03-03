module TwitterClient
class Endpoint
  def initialize(app)

  end

  def call(env)
    [200, {}, evn.inspect]
  end

  def init_oauth
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
end
end
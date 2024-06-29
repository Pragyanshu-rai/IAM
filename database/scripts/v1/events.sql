-- creating an event to remove any entry that is older than 5 minutes

DELIMITER |

CREATE EVENT IF NOT EXISTS remove_old_tokens
ON SCHEDULE
  EVERY 4 MINUTES
  STARTS NOW()
ENABLE
COMMENT 'remove every token that is older than 10 minutes'
DO
BEGIN
  IF IAM.PasswordResetRequest.isValid = 1 AND IAM.PasswordResetRequest.reset_token_creation <= (NOW() - 500) THEN
    UPDATE PasswordResetRequest
    SET isValid = 0
    WHERE reset_token_expiration <= (NOW() - 500);
  END IF;
END |

DELIMITER ;